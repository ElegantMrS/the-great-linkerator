import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const LinkCard = (props) => {

  const { link } = props;

  const classes = useStyles();

  // const tagClickHandler = () => {
    
  // }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/200"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" color="textSecondary" component="h4">
            {link.url}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {link.comment}
          </Typography>
            {link.tags.map((tag, index) => {
              return (
                <div key={index}>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {tag.name}
                  </Typography>
                </div>
                )
            })}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Go to site
        </Button>
        <Button size="small" color="primary">
          More with this tag
        </Button>
      </CardActions>
    </Card>
  );
}

export default LinkCard;