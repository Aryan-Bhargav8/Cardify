"use client"
// app/(main)/explore/page.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Container, Grid,  Typography, CardMedia} from '@mui/material';

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
  user: {
    id: string;
    name: string;
  };
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="w-full mb-6 break-inside-avoid">
    <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-lg">
      <CardContent className="p-6 flex flex-col h-full">
          {post.user.name}
          {post.quiz.videoUrl && (
          <CardMedia
            component="iframe"
            src={post.quiz.videoUrl}
            title="Related Video"
          />
        )}
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
       
      </CardContent>
    </Card>
    </div>
  );
};

const ExplorePage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
      fetch('/api/posts')
        .then((res) => res.json())
        .then((data: Post[]) => setPosts(data))
        .catch((error) => console.error('Error fetching posts:', error));

          /*{
      id: '1',
      content: 'This is a great quiz about React and TypeScript!',
      quiz: {
        id: '1',
        title: 'Sample Quiz on React',
        questions: ['What is React?', 'What is TypeScript?'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      createdAt: '2024-09-04',
      user: {
        id: '1',
        name: 'John Doe',
      },
    },
    {
      id: '1',
      content: 'This is a great quiz about React and TypeScript!',
      quiz: {
        id: '1',
        title: 'Sample Quiz on React',
        questions: ['What is React?', 'What is TypeScript?'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      createdAt: '2024-09-04',
      user: {
        id: '1',
        name: 'John Doe',
      },
    },
    {
      id: '1',
      content: 'This is a great quiz about React and TypeScript!',
      quiz: {
        id: '1',
        title: 'Sample Quiz on React',
        questions: ['What is React?', 'What is TypeScript?'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      createdAt: '2024-09-04',
      user: {
        id: '1',
        name: 'John Doe',
      },
    },
    {
      id: '1',
      content: 'This is a great quiz about React and TypeScript!',
      quiz: {
        id: '1',
        title: 'Sample Quiz on React',
        questions: ['What is React?', 'What is TypeScript?'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      createdAt: '2024-09-04',
      user: {
        id: '1',
        name: 'John Doe',
      },
    },
    {
      id: '1',
      content: 'This is a great quiz about React and TypeScript!',
      quiz: {
        id: '1',
        title: 'Sample Quiz on React',
        questions: ['What is React?', 'What is TypeScript?'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      createdAt: '2024-09-04',
      user: {
        id: '1',
        name: 'John Doe',
      },
    },*/

    }, []);
  
 

  return (
    <Container>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} lg={4} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ExplorePage;
