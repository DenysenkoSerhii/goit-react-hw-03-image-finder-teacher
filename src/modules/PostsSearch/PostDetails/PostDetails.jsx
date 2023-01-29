import styles from "./post-details.module.scss";

const PostDetails = ({largeImageURL}) => {
    return (
        <div>
            <img src={largeImageURL} alt=""/>
        </div>
    )
}

export default PostDetails;