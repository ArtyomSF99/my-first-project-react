import React, { useEffect, useMemo, useRef, useState } from 'react';
import PostService from '../API/PostService';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/MyModal/MyModal';
import Pagination from '../components/UI/pagination/Pagination';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';
import { getPagesCount } from '../utils/pages';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';



function Posts() {
  const [posts, setPosts] = useState([ ])
  const[filter, setFilter] = useState({sort:'', query:''})
  const[modal, setModal] = useState(false);
  const[limit, setLimit] = useState(10);
  const[page, setPage] = useState(1);
  const[totalPages, setTotalPages] = useState(0);
  const lastElement = useRef();
  console.log(lastElement);
  
  const [ fetchPosts, isPostsLoadnig, postError] = useFetching( async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount =response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount,limit));
  })
  
  console.log(totalPages)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useObserver(lastElement, page<totalPages, isPostsLoadnig, () =>{
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit])
  

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  }

  
  

  const removePost = (post) => {
    setPosts(posts.filter(p=>p.id !== post.id))
  }
  
  const changePage = (page) => {
    setPage(page);
    
  }
 
  return (
    <div>

      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          {value: 5, name:'5'},
          {value: 10, name:'10'},
          {value: 25, name:'25'},
          {value: -1, name:'Показать все'},
        ]}
      />
      {postError && 
        <h1>Произошла ошибка ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title = "Посты про JS"/>
      <div ref={lastElement} style={{height:20, background:'red'}}/>
      {isPostsLoadnig &&
        <div style={{display:'flex', justifyContent:'center', marginTop: 50}}><Loader/></div>
      }

    
      
      <Pagination
        page={page} 
        changePage={changePage} 
        totalPages={totalPages}
       />
  </div>
    
    
  );
    };

export default Posts;