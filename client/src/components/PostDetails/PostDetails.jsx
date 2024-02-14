import { Typography, CircularProgress, Divider, Card } from '@mui/material';
import { getPost, getPostsBySearch } from '../../actions/posts';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import CommentsSection from './CommentsSection';
import moment from 'moment';
import './postdetail.css';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [vertical, setVertical] = useState(false);

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post, dispatch]);

    if (!post) return null;

    const openPost = (_id) => navigate(`/posts/${_id}`);

    const verticalView = () => {
        setVertical(!vertical);
    }

    const handleImageClick = () => {
        setIsFullScreen(!isFullScreen);
    };

    if (isLoading) {
        return <CircularProgress className='loader' color='grey' size='4rem' />;
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id).slice(0, 3);

    return (
        <div className='cont'>
            <div className={`main ${vertical ? 'altview' : ''}`}>
                <div className={`second ${vertical ? '1' : ''}`}>
                    <img
                        className={`imag ${isFullScreen ? 'fullscreen' : ''}`}
                        src={post.selectedfile}
                        alt=''
                        onClick={handleImageClick}
                    />
                    <button onClick={verticalView}
                        class='verticalbutton'
                    >
                        toggle view
                    </button>
                </div>
                <div className={`first ${vertical ? '1' : ''}`}>
                    <h2 className='posttitle'>{post.title}</h2>
                    <Typography gutterBottom variant='h6' color='textSecondary' component='h2'>
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                    <Typography gutterBottom variant='body1' component='p' style={{ overflow: 'hidden' }}>
                        {post.message}
                    </Typography>
                    <Typography variant='h6' color='textSecondary'>
                        Posted by: {post.name}
                    </Typography>
                    <Typography variant='body1' style={{ color: 'textSecondary' }}>
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                    <CommentsSection post={post} />
                </div>
            </div>

            {!!recommendedPosts.length && (
                <div className='sect'>
                    <Typography gutterBottom variant='h5' style={{ color: '#c8102e' }}>
                        You might also like
                    </Typography>
                    <Divider color='#c8102e' />
                    <div className='recommendedPosts'>
                        {recommendedPosts.map(({ title, likes, selectedfile, _id }) => (
                            <Card class='recpost' onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant='h6'>{title}</Typography>
                                <img
                                    src={selectedfile}
                                    class='recimg'
                                    onClick={() => openPost(_id)}
                                />
                                <Typography gutterBottom variant='subtitle1'>{likes.length} likes</Typography>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetails;