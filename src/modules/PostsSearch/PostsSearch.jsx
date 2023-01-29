import { Component } from "react";
// import axios from "axios";

import Modal from "../../shared/components/Modal/Modal";

import PostsSearchForm from "./PostsSearchForm/PostsSearchForm";
import PostsSearchList from "./PostsSearchList/PostsSearchList";
import PostDetails from "./PostDetails/PostDetails";

import { searchPosts } from "../../shared/services/posts-api";

import styles from "./posts-search.module.scss";

// class PostsSearch extends Component {
//         state = {
//             items: [],
                     
//     }
    
//         componentDidMount(){
//             axios.get("https://pixabay.com/api/?q=cat&page=1&key=31858870-09ead0999ee20650dc52876fe&image_type=photo&orientation=horizontal&per_page=12")
//                   .then(({data})=>{
//                 this.setState({items: data.hits})
//             })
//         }
//         render(){
//             const {items} = this.state;
                     
//             console.log(items);

//             const elements = items.map(({ id, webformatURL}) => <li key={id} className={styles.item}>
// //                                                                 <img src={webformatURL} alt="" />
// //                                                             </li>);

//     return (
//         <ul className={styles.list}>
//             {elements}
//         </ul>
//     )
//         }
//     }



class PostsSearch extends Component {
    state = {
        search: "",
        items: [],
        loading: false,
        error: null,
        page: 1,
        showModal: false,
        postDetails: null,
    }

    componentDidUpdate(prevProps, prevState) {
        const {search, page} = this.state;
        if(prevState.search !== search || prevState.page !== page) {
            this.fetchPosts();
        }
    }

    async fetchPosts() {
        try {
            this.setState({loading: true});
            const {search, page} = this.state;
            const data = await searchPosts(search, page);
            console.log(data);
            this.setState(({items}) => ({
                items: [...items, ...data]
            }))
        }
        catch(error) {
            this.setState({error: error.message})
        }
        finally {
            this.setState({loading: false})
        }
    }

    searchPosts = ({search})=> {
        this.setState({search, items: [], page: 1});
    }

    loadMore = ()=> {
        this.setState(({page}) => ({page: page + 1}))
    }

    showPost = ({webformatURL, largeImageURL}) => {
        this.setState({
            postDetails: {
                webformatURL,
                largeImageURL
                },
            showModal: true,
        })
    }

    closeModal = ()=> {
        this.setState({
            showModal: false,
            postDetails: null,
        })
    }

    render() {
        const { items, loading, error, showModal, postDetails } = this.state;
        const {searchPosts, loadMore, showPost, closeModal} = this;
        
        return (
            <>
                <PostsSearchForm onSubmit={searchPosts} />
                <PostsSearchList items={items} showPost={showPost} />
                {error && <p className={styles.errorMessage}>{error}</p>}
                {loading && <p>...Load posts</p>}
                {Boolean(items.length) && <button onClick={loadMore}>Load more</button>}
                {showModal && <Modal close={closeModal}>
                    <PostDetails {...postDetails} />
                </Modal>}
            </>
        )
    }
}

export default PostsSearch;