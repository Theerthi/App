import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./App.css"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    maxHeight: 700,
    float: "left",
    padding: 20,
    margin: 20
  },
  media: {
    height: 200,
    width: 150
  }
}));

export const  ShipmentDetail = () =>{
  const classes = useStyles();   
  const [shipmentDetails, setShipmentDetails] = useState([]);
  const [searchItems, setSearchItems] = useState('');
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments')
            .then(response => response.json())
            .then(data => setShipmentDetails(data));
    }, []);

    const handleChangeByType = (e) => {   
        setSearchItems(e.target.value);
    };

    const filteredData = shipmentDetails.filter(item => {
    return item.details.type.toLowerCase().indexOf(searchItems.toLowerCase()) !== -1;
    });

    return (
    <div>
    {filteredData.length > 0 ? <p className="text">{`${filteredData.length} Product(s) found.`} </p> :
    <p className="text">0 Product found</p>
    }   
    Order By
    <input value={searchItems} onChange={handleChangeByType} placeholder="Search"/>
    {filteredData.map((list) => (
    <Card className={classes.root} key={list.id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={list.details.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            {list.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${list.details.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" >
          Add to cart
        </Button>
      </CardActions>
    </Card>
    ))}
    </div>
  );
}