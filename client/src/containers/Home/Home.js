import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Home.module.css";
import { connect } from "react-redux";

import HomeBanner from "../../assets/home_banner.svg";
import Manage from "../../assets/manager_.svg";
import Create from "../../assets/content_creation.svg";
import Participate from "../../assets/group_presentation.svg";

import Cloud from "../../assets/cloud.svg";
import Access from "../../assets/accessible.svg";
import AllInOne from "../../assets/all-in-one.svg";
import Management from "../../assets/folder-management.svg";

import { GitHub } from "@material-ui/icons";

const Home = (props) => {
  return (
    <div className={classes.HomeWrapper}>
      <div className={classes.Banner}>
        <div className={classes.BannerItem}>
          <h1 className={classes.BannerTitle}>Classroom</h1>
          <h2 className={classes.BannerSubtitle}>
            A One-Stop Solution <br />
            for Online Classrooms.
            <br />
          </h2>
          <h1 className={classes.BannerSubtitle}>Built for Productivity|</h1>
          <div className={classes.BannerButtons}>
            <NavLink
              to="/about"
              activeClassName={classes.BannerButton}
              className={classes.BannerButton}
            >
              About
            </NavLink>
            {props.isAuth ? (
              <NavLink to="/dashboard" className={classes.BannerButton}>
                Go to Dashboard
              </NavLink>
            ) : (
              <NavLink to="/login" className={classes.BannerButton}>
                Get Started
              </NavLink>
            )}
          </div>
        </div>
        <div className={classes.BannerItem}>
          <img src={HomeBanner} alt="Home Banner" />
        </div>
      </div>
      <div className={classes.Features}>
        <div className={classes.Heading}>
          <h1>Create. Participate. Manage.</h1>
          <div className={classes.CustomBottomBorder} />
        </div>
        <div className={classes.CMP}>
          <div className={classes.CMPItem}>
            <img src={Create} alt="Create" />
            <p>
              Create as many classrooms you want for as many students you want.
            </p>
          </div>
          <div className={classes.CMPItem}>
            <img src={Manage} alt="Create" />
            <p>
              Manage all your classrooms in one place. From anywhere. At
              anytime.
            </p>
          </div>
          <div className={classes.CMPItem}>
            <img src={Participate} alt="Create" />
            <p>
              Enroll in as many classrooms as you wish. Because your learning
              shall know no bounds.
            </p>
          </div>
        </div>
      </div>
      <div className={classes.Features}>
        <h1 className={classes.HeadingBig}>Why Classroom?</h1>
        <div className={classes.FeatureGrid}>
          <div className={classes.Feature}>
            <img src={Access} alt="Access Img" />
            <p>Access all your data at anytime, anywhere.</p>
          </div>
          <div className={classes.Feature}>
            <img src={Cloud} alt="Access Img" />
            <p>
              All files are stored in Cloud allowing fast <br /> and easy access
              all the time.
            </p>
          </div>
          <div className={classes.Feature}>
            <img src={AllInOne} alt="Access Img" />
            <p>
              Create Lectures, Assignments, Forums, and many more for a single
              classroom.
            </p>
          </div>
          <div className={classes.Feature}>
            <img src={Management} alt="Access Img" />
            <p>
              Lectures help to categorise files.
              <br /> Read what you need.Download what you want.
            </p>
          </div>
        </div>
      </div>
      <div className={classes.Footer}>
        <h4>
          Made with ❤ by Sayan Das. &copy;Sayan Das
          {new Date(Date.now()).getFullYear()}
          &nbsp;
          <a href="https://github.com/senshiii">
            <GitHub style={{ color: "white" }} />
          </a>
        </h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(Home);
