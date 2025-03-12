/** @jsxImportSource @emotion/react */
"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseclient';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login');
        } else {
          setUser(session.user);
          fetchPosts(); // Fetch posts after session is set
        }
      };

      fetchSession();

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_OUT') {
            router.push('/login');
          }
          if (session) {
            setUser(session.user);
          }
        }
      );

      return () => {
        authListener?.remove();  // Cleanup
      };
    }
  }, [router]);

  const fetchPosts = async () => {
    const fetchedPosts = [
      { id: 1, title: 'First Post', content: 'This is the first post' },
      { id: 2, title: 'Second Post', content: 'Here is another post' },
      { id: 3, title: 'Third Post', content: 'Some more content here' }
    ];
    setPosts(fetchedPosts);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/signin');
  };

  const handlePasswordChange = async () => {
    if (newPassword) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        alert('Error updating password: ' + error.message);
      } else {
        alert('Password updated successfully!');
        setNewPassword('');
      }
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <Wrapper>
      <Header>
        <Title>Welcome, {user?.email}!</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>

      <Content>
        <Section>
          <SectionTitle>Your email: {user?.email}</SectionTitle>
          <Button onClick={handleLogout}>Logout</Button>
        </Section>

        {/* Change Password */}
        <Section>
          <SectionTitle>Change Your Password</SectionTitle>
          <Input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button onClick={handlePasswordChange}>Update Password</Button>
        </Section>

        {/* Posts */}
        <Section>
          <SectionTitle>Your Posts</SectionTitle>
          {posts.length > 0 ? (
            <PostList>
              {posts.map((post) => (
                <PostCard key={post.id}>
                  <PostTitle>{post.title}</PostTitle>
                  <PostContent>{post.content}</PostContent>
                </PostCard>
              ))}
            </PostList>
          ) : (
            <p>You have no posts yet.</p>
          )}
        </Section>

        {/* Create Post */}
        <Section>
          <Button onClick={() => alert('Create a new post feature coming soon!')}>Create New Post</Button>
        </Section>
      </Content>
    </Wrapper>
  );
}

// Styled Components with Emotion
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #121212;
  color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #333;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
`;

const LogoutButton = styled.button`
  background-color: #FF5C5C;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #FF4040;
  }
`;

const Content = styled.div`
  margin-top: 20px;
`;

const Section = styled.section`
  background-color: #1F1F1F;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: #F2F2F2;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  outline: none;
  
  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border: 1px solid #FF5C5C;
  }
`;

const Button = styled.button`
  background-color: #FF5C5C;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #FF4040;
  }
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostCard = styled.li`
  background-color: #333;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const PostTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
`;

const PostContent = styled.p`
  font-size: 1rem;
  color: #ccc;
`;

