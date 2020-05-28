
import React, { useEffect, useState } from "react";
import { Drawer, Typography, Divider, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Clear from "@material-ui/icons/Clear";
import { getImages } from "../utils/ImageApi";
import {getColor} from '../utils/colorApi'



const useStyle = makeStyles((theme) => ({
  drawerPaper: {
    width: "400px",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  titleContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-around",
    marginBottom: theme.spacing(2),
  },
  menuContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  menu: {
    width: "45%",
    height: "90px",
    background: "blue",
    display: "flex",
    alignItems: "flex-end",
    borderRadius: "8px",
    marginTop: theme.spacing(2),
  },
  ref: {
    fontSize: "1rem",
    color: "#fff",
  },
}));

interface SidemenuProps {
    setBackgroundUrl: any;
    setBackgroundColor: any;
  setOpen: any;
  open: any;
}

const SideMenu = ({ setBackgroundUrl, setBackgroundColor, setOpen, open }: SidemenuProps) => {
  const classes = useStyle();
  const [photos, setPhotos] = useState([]);
    const [selector, setSelector] = useState("photo");
    const [colors, setColors] = useState([]);

  const readImge = async () => {
    setPhotos(await getImages());
  };

    const readColor = async () => {
    setColors(await getColor())
    
  }  
    
  useEffect(() => {
      readImge();
      readColor()
     
  }, []);

    const renderColorField = () => {
        if (selector === 'color') {

            return (
              <div className={classes.menuContainer}>
                {colors.map((color: any) => (
                  <div
                    className={classes.menu}
                    style={{
                      backgroundColor: `#${color}`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                        onClick={() => { 
                            setBackgroundColor(`#${color}`);
                            setBackgroundUrl('');
                            
                        }}
                  ></div>
                ))}
              </div>
            );
         
        }
    }
    
    
  const renderPhotoField = () => {
      if (selector === "photo") {
             
          return (
            <div className={classes.menuContainer}>
              {photos.map((photo: any, idx:number) => (
                <div
                  key={idx}
                  className={classes.menu}
                  style={{
                    backgroundImage: `url(${photo.thumb})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  onClick={() => setBackgroundUrl(photo.full)}
                >
                  <span>
                    <Link
                      href={photo.user.link}
                      target="_blank"
                      className={classes.ref}
                    >
                      {photo.user.username}
                    </Link>
                  </span>
                </div>
              ))}
            </div>
          );
         }
   }     
    
    
    
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(!open)}
      anchor="right"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.titleContainer}>
        <Typography className={classes.title}>Change Background</Typography>
        <Clear onClick={() => setOpen(!open)} />
      </div>
      <Divider />
      <div className={classes.menuContainer}>
        <div
          className={classes.menu}
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/755726/pexels-photo-755726.jpeg?cs=srgb&dl=astronomy-astrophotography-clouds-colors-755726.jpg&fm=jpg)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => setSelector("photo")}
        >
          <span>photo</span>
        </div>
        <div
          className={classes.menu}
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/226589/pexels-photo-226589.jpeg?cs=srgb&dl=closeup-photo-of-multi-color-stick-226589.jpg&fm=jpg)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => setSelector("color")}
        >
          <span>color</span>
        </div>
      </div>
      {renderPhotoField()}
      {renderColorField()}
    </Drawer>
  );
};

export default SideMenu;
