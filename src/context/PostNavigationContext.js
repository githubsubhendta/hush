import React, {createContext, useState, useContext} from 'react';

const PostNavigationContext = createContext();

export const PostNavigationProvider = ({posts = [], children}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextPost = () => {
    if (posts.length === 0) return;
    setCurrentIndex(prevIndex => (prevIndex + 1) % posts.length);
  };

  const goToPreviousPost = () => {
    if (posts.length === 0) return;
    setCurrentIndex(prevIndex => (prevIndex - 1 + posts.length) % posts.length);
  };

  const currentPost = posts[currentIndex] || null;
  const currentNsfw = currentPost ? currentPost.nsfw : false;

  return (
    <PostNavigationContext.Provider
      value={{
        posts,
        currentIndex,
        currentPost,
        currentNsfw,
        goToNextPost,
        goToPreviousPost,
        setCurrentIndex,
      }}>
      {children}
    </PostNavigationContext.Provider>
  );
};

export const usePostNavigation = () => {
  const context = useContext(PostNavigationContext);
  if (!context) {
    throw new Error(
      'usePostNavigation must be used within a PostNavigationProvider',
    );
  }
  return context;
};
