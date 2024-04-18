import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { getPostRequest, selectPost } from './slices';

import FavoriteIcon from '@mui/icons-material/Favorite';

import styles from './Detail.module.css';

const DetailPage = () => {
  const { id } = useParams();
  const post = useAppSelector(selectPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;

    dispatch(getPostRequest(+id));
  }, [id]);

  return (
    <div className={styles.detailWrapper}>
      <div className={styles.post}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <div style={{ display: 'flex' }}>
          <FavoriteIcon sx={{ marginRight: '5px' }} />
          {post.reactions}
        </div>
        <div>
          {post.tags.map((tag) => (
            <span key={tag} style={{ marginRight: '5px' }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
