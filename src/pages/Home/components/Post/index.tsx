import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Post } from '../../../../interfaces/post.ts';

import styles from './Post.module.css';

interface PostProps {
  post: Post;
}

const PostItem = ({ post }: PostProps) => (
  <Card className={styles.post}>
    <CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.body}>
          {post.body}
        </Typography>
        <Typography component="div" className={styles.bottomContent}>
          <Typography component="div" sx={{ display: 'flex' }}>
            <FavoriteIcon sx={{ marginRight: '5px' }} />
            {post.reactions}
          </Typography>
          <Typography component="div">
            {post.tags.map((tag) => (
              <span key={tag} style={{ marginRight: '5px' }}>
                #{tag}
              </span>
            ))}
          </Typography>
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default PostItem;
