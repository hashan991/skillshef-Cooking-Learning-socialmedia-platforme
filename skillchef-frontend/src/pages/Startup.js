import React from "react";
import myImage from "../images/myImage.png";
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  LocationOn,
  Mail,
  Phone,
  AccessTime,
  AutoAwesome,
  BarChart,
  Comment,
  NotificationsActive,
  School,
  PeopleAlt,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

import locationMap from "../images/location-map.png";

function Startup() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden", // Ensures the background image doesn't overflow
      }}
    >
      <>
        {/* HERO SECTION with video */}
        <Box
          sx={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Box
            component="video"
            src="https://cdn.pixabay.com/video/2023/08/08/175152-852857786_large.mp4"
            autoPlay
            muted
            loop
            playsInline
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to right, rgba(255,255,255,0.96) 40%, rgba(255,255,255,0) 70%)",
              display: "flex",
              alignItems: "center",
              px: { xs: 3, md: 10 },
            }}
          >
            <Box sx={{ maxWidth: 500 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Experience a <span style={{ color: "#00754a" }}>fresh way</span>{" "}
                to
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="#00754a"
                gutterBottom
              >
                manage cooking skills
              </Typography>
              <Typography variant="body1" sx={{ color: "gray", my: 2 }}>
                Reach your culinary goals with personalized lessons, cooking
                plans, shared recipes, and progress tracking – all for free on
                SkillChef.
              </Typography>

              <Stack direction="row" spacing={2} mt={3}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#00754a" }}
                  onClick={() => navigate("/register")}
                >
                  Sign Up for SkillChef
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Contact Us Section */}
        <Box py={6} px={{ xs: 2, md: 10 }} bgcolor="white" id="contact-us">
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 4 }}
          >
            CONTACT US
          </Typography>

          <Grid
            container
            spacing={6}
            alignItems="center"
            justifyContent="center"
            sx={{
              flexWrap: { xs: "wrap", sm: "nowrap" }, // 🟢 Prevent wrap on small+ screens
            }}
          >
            {/* Left Side - Image */}
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={locationMap}
                alt="Contact Us"
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  ml: -15,
                }}
              />
            </Grid>

            {/* Right Side - Info */}
            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                <Box display="flex" alignItems="flex-start">
                  <LocationOn
                    fontSize="large"
                    color="primary"
                    sx={{ mr: 2, mt: 0.5 }}
                  />
                  <Box>
                    <Typography fontWeight="bold">
                      Our Office Address
                    </Typography>
                    <Typography color="text.secondary">
                      PRI (Pvt) Ltd. 123, Industrial Zone, Colombo 05, Sri Lanka
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="flex-start">
                  <Mail
                    fontSize="large"
                    color="primary"
                    sx={{ mr: 2, mt: 0.5 }}
                  />
                  <Box>
                    <Typography fontWeight="bold">General Enquiries</Typography>
                    <Typography color="text.secondary">
                      SkillChef@email.com
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="flex-start">
                  <Phone
                    fontSize="large"
                    color="primary"
                    sx={{ mr: 2, mt: 0.5 }}
                  />
                  <Box>
                    <Typography fontWeight="bold">Call Us</Typography>
                    <Typography color="text.secondary">
                      +94-78 111 1111
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="flex-start">
                  <AccessTime
                    fontSize="large"
                    color="primary"
                    sx={{ mr: 2, mt: 0.5 }}
                  />
                  <Box>
                    <Typography fontWeight="bold">Our Timing</Typography>
                    <Typography color="text.secondary">
                      Mon - Sun: 10:00 AM - 07:00 PM
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* About Us Section */}
        <Box py={8} px={{ xs: 2, md: 12 }} bgcolor="#f9f9f9" id="about-us">
          <Typography
            variant="h3"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 6 }}
          >
            ABOUT US
          </Typography>

          <Grid
            container
            spacing={8}
            alignItems="center"
            justifyContent="center"
            sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
          >
            {/* Left Side - Image */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CardMedia
                component="img"
                image={myImage}
                alt="About Us"
                sx={{
                  width: "100%",
                  maxWidth: "600px",
                  height: "auto",
                  maxHeight: "350px",
                  borderRadius: "16px",
                  boxShadow: "0 6px 30px rgba(0,0,0,0.15)",
                }}
              />
            </Grid>

            {/* Right Side - Text */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                flexGrow: 1,
                maxWidth: "600px",
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
                paragraph
              >
                At SkillChef, we specialize in empowering home cooks and
                culinary learners through an interactive skill-sharing and
                learning platform. Our mission is to bring together passionate
                food lovers, enabling them to showcase their cooking skills,
                share learning journeys, and connect with a vibrant community.
                Whether you're mastering a new recipe or building a step-by-step
                learning plan, SkillChef streamlines your culinary growth with
                engaging tools, social features, and personalized progress
                tracking.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
              >
                Our platform simplifies wishlist tracking, shopping list
                management, meal planning, and inventory monitoring. With
                automation, smart notifications, and AI-driven insights, we are
                committed to enhancing productivity, reducing stress, and
                bringing convenience to modern households.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Footer />
      </>
    </Box>
  );
}

export default Startup;
