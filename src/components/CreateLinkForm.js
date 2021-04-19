import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { createLink } from '../api';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CreateLinkForm = () => {

  const classes = useStyles();

  const [linkUrl, setLinkUrl] = useState('');
  const [linkComment, setLinkComment] = useState('');
  const [tagList, setTagList] = useState([]);

  return (
    <Card className={classes.root}>
      <form onSubmit={e => {
              e.preventDefault();
              console.log(linkComment, tagList);
              // localStorage.getItem(`${loginToken}`);
              createLink(linkUrl, linkComment, tagList); //import postId and/or willDeliver?
              alert('Your post has been created!');

            }}
      >
      <CardContent>
      <Typography className={classes.pos} color="textSecondary" gutterBottom>
          Enter New Link URL
        </Typography>
        <TextField id="outlined-basic" label="Link URL" variant="outlined" 
          required onChange={(e) => setLinkUrl(e.target.value)} value={linkUrl}
        />
        <Typography className={classes.pos} color="textSecondary" gutterBottom>
          Add Comment
        </Typography>
        <TextField id="outlined-basic" label="Comment" variant="outlined" 
          required onChange={(e) => setLinkComment(e.target.value)} value={linkComment}
        />
        <Typography className={classes.pos} color="textSecondary" gutterBottom>
          Add Tags
        </Typography>
        <TextField id="outlined-basic" label="Tags" variant="outlined" 
          required onChange={(e) => setTagList(e.target.value)} value={tagList}
        />
      </CardContent>
      <CardActions>
        <Button size="medium" type="submit"
        >Create Link</Button>
      </CardActions>
      </form>
    </Card>
  );
}

export default CreateLinkForm;