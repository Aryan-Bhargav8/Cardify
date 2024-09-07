"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Container, Grid, Typography, CardMedia } from '@mui/material';
import { useAuth } from '@clerk/nextjs';

 
/*
i used this to mock 
interface Quiz {
  id: string;
  title: string;
  questions: string[];
  videoUrl: string;
}

interface Post {
  id: string;
  content: string;
  quiz: Quiz;
  createdAt: string;
  likes: number;
  user: {
    id: string;
    name: string;
  };
}


// Mock Data for testing
const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Post 1 content',
    quiz: { id: 'quiz1', title: 'Quiz 1', questions: ['Q1', 'Q2'], videoUrl: 'https://www.youtube.com/embed/JSlYCkDS7Cc' },
    createdAt: new Date().toISOString(),
    likes: 10,
    user: { id: 'user1', name: 'User 1' },
  },
  {
    id: '2',
    content: 'Post 2 content',
    quiz: { id: 'quiz2', title: 'Quiz 2', questions: ['Q3', 'Q4'], videoUrl: 'https://www.youtube.com/embed/JSlYCkDS7Cc' },
    createdAt: new Date().toISOString(),
    likes: 5,
    user: { id: 'user2', name: 'User 2' },
  },
];

// Mocked liked posts by the current user
const mockLikedPostIds = ['1'];

const PostCard: React.FC<{ post: Post; onLike: (id: string) => void; liked: boolean }> = ({ post, onLike, liked }) => {
  return (
   
    <div className="w-full mb-6 break-inside-avoid">
      <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-lg">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-start space-x-4 mb-4">{post.user.name}</div>
          <div>
            {post.quiz.videoUrl && (
              <CardMedia component="iframe" src={post.quiz.videoUrl} title="Related Video" />
            )}
          </div>
          <p className="text-muted-foreground mb-4">{post.content}</p>
          <div>
            {post.quiz.questions.map((question, index) => (
              <Typography key={index} variant="body1">
                {index + 1}. {question}
              </Typography>
            ))}
          </div>
          <div className="flex items-center mt-4">
            <div>
            <button
              onClick={() => onLike(post.id)}
              className={`text-sm ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
            >
              {liked ? '❤️ Liked' : '🤍 Like'}
            </button>
            </div>
            <Typography variant="body2" padding="10px">{post.likes} {post.likes === 1 ? 'like' : 'likes'}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ExplorePage: React.FC = () => {
  const { userId } = useAuth(); // Simulate logged-in user (you can mock this as well)
  const [posts, setPosts] = useState<Post[]>([]);
  const [userLikes, setUserLikes] = useState<{ [key: string]: boolean }>({});

  // Mock API call with hardcoded data
  useEffect(() => {
    if (userId) {
      // Simulate fetching posts and likes
      setTimeout(() => {
        setPosts(mockPosts);

        // Map user likes
        const likes = mockLikedPostIds.reduce((acc: { [key: string]: boolean }, postId: string) => {
          acc[postId] = true;
          return acc;
        }, {});
        setUserLikes(likes);
      }, 1000); // Simulate network delay
    }
  }, [userId]);

  const handleLike = (postId: string) => {
    const alreadyLiked = userLikes[postId];

    // Optimistic UI update
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: alreadyLiked ? post.likes - 1 : post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);

    setUserLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !alreadyLiked,
    }));
  };

  if (!userId) {
    return <div>Please log in to explore posts and like them.</div>;
  }

  return (
  
    <Container>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} lg={4} key={post.id}>
            <PostCard post={post} liked={!!userLikes[post.id]} onLike={handleLike} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ExplorePage;*/

interface Quiz {
  id: string;
  title: string;
  questions: string[];
  videoUrl: string;
}

interface Post {
  id: string;
  content: string;
  quiz: Quiz;
  createdAt: string;
  likes:number;
  user: {
    id: string;
    name: string;
  };
}



const PostCard: React.FC<{ post: Post; onLike: (id: string) => void; liked: boolean }> = ({ post, onLike, liked }) => {

  return (
    <div className="w-full mb-6 break-inside-avoid">
    <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-lg">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start space-x-4 mb-4">
          {post.user.name}
        </div>
          <div>
          {post.quiz.videoUrl && (
          <CardMedia
            component="iframe"
            src={post.quiz.videoUrl}
            title="Related Video"
          />
        )}
          </div>
         <p className="text-muted-foreground mb-4">
         {post.content}
        </p>
        
        <div>
          {post.quiz.questions.map((question, index) => (
            <Typography key={index} variant="body1">
              {index + 1}. {question}
            </Typography>
          ))}
        </div>
        
        <div className="flex items-center mt-4">
        <button
              onClick={() => onLike(post.id)}
              className={`text-sm ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
          >
              {liked ? '❤️ Liked' : '🤍 Like'}
            </button>
            <Typography variant="body2" padding="10px">
              {post.likes} {post.likes === 1 ? 'like' : 'likes'}
            </Typography>
          </div>
      </CardContent>
    </Card>
    </div>
  );
};

const ExplorePage: React.FC = () => {
  const { userId } = useAuth(); // Get authenticated user ID
  const [posts, setPosts] = useState<Post[]>([]);
  const [userLikes, setUserLikes] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (userId) {
      // Fetch posts and likes data from backend
      fetch('/api/posts')
        .then((res) => res.json())
        .then(({ posts, likedPostIds }) => {
          setPosts(posts);
          const likes = likedPostIds.reduce((acc: { [key: string]: boolean }, postId: string) => {
            acc[postId] = true;
            return acc;
          }, {});

          setUserLikes(likes);
        })
        .catch((error) => console.error('Error fetching posts:', error));
    }
  }, [userId]);

  const handleLike = async (postId: string) => {
    const alreadyLiked = userLikes[postId];

    // Optimistic UI update
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: alreadyLiked ? post.likes - 1 : post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);

    setUserLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !alreadyLiked,
    }));

    try {
      await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          like: !alreadyLiked,
        }),
      });
    } catch (error) {
      console.error('Error updating like:', error);

      // Rollback UI update if API fails
      setUserLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: alreadyLiked,
      }));

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, likes: alreadyLiked ? post.likes + 1 : post.likes - 1 }
            : post
        )
      );
    }
  };

  if (!userId) {
    return <div>Please log in to explore posts and like them.</div>;
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} lg={4} key={post.id}>
            <PostCard post={post} liked={!!userLikes[post.id]} onLike={handleLike} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ExplorePage;

