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

        {/* Features Section - Professional */}
        <Box
          py={12}
          px={{ xs: 3, md: 12 }}
          sx={{
            background: "linear-gradient(120deg, #ffffff, #f8f8f8, #f0fcf5)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              background: "linear-gradient(90deg, #00754a, #4CAF50, #00754a)",
            },
          }}
          id="features"
        >
          {/* Decorative Elements */}
          <Box
            sx={{
              position: "absolute",
              top: "5%",
              left: "5%",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,117,74,0.03) 0%, rgba(0,117,74,0) 70%)",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "10%",
              right: "5%",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,117,74,0.05) 0%, rgba(0,117,74,0) 70%)",
              zIndex: 0,
            }}
          />
          <Typography
            variant="h3"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{
              mb: 2,
              position: "relative",
              marginLeft: "auto",
              marginRight: "auto",
              width: "fit-content",
            }}
          >
            PLATFORM FEATURES
          </Typography>
          {/* Subtitle */}
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{
              mb: 8,
              maxWidth: "700px",
              mx: "auto",
              fontWeight: 400,
              fontSize: "1.1rem",
            }}
          >
            Discover our powerful tools designed to enhance your culinary
            journey
          </Typography>
          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {[
              {
                title: "Skill Sharing Posts",
                description:
                  "Upload and share your cooking creations using photos or videos. Engage with others through likes and comments.",
                icon: <Comment sx={{ fontSize: 40, color: "#00754a" }} />,
                highlight: "Most Popular",
              },
              {
                title: "Learning Progress Updates",
                description:
                  "Document your culinary journey by sharing progress and milestones with your followers.",
                icon: <School sx={{ fontSize: 40, color: "#00754a" }} />,
                highlight: "Growth Tracker",
              },
              {
                title: "Learning Plans",
                description:
                  "Create structured plans to master new skills or cuisines and track your daily progress.",
                icon: <AutoAwesome sx={{ fontSize: 40, color: "#00754a" }} />,
                highlight: "Customizable",
              },
              {
                title: "Social Features",
                description:
                  "Follow users, explore trending content, and build a culinary network around your interests.",
                icon: <PeopleAlt sx={{ fontSize: 40, color: "#00754a" }} />,
                highlight: "Community",
              },
              {
                title: "Post Analytics",
                description:
                  "Understand your audience better with insights into views and engagement.",
                icon: <BarChart sx={{ fontSize: 40, color: "#00754a" }} />,
                highlight: "Insights",
              },
              {
                title: "Real-time Notifications",
                description:
                  "Get instant alerts for likes, comments, and new followers – stay updated anytime.",
                icon: (
                  <NotificationsActive
                    sx={{ fontSize: 40, color: "#00754a" }}
                  />
                ),
                highlight: "Instant",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    height: "100%",
                    minHeight: "280px", // Fixed minimum height for consistency
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.08)",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "3px",
                      background: "linear-gradient(90deg, #00754a, #4CAF50)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    },
                    "&:hover::after": {
                      opacity: 1,
                    },
                  }}
                >
                  {/* Feature highlight tag */}
                  {feature.highlight && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        backgroundColor: "rgba(0,117,74,0.08)",
                        color: "#00754a",
                        borderRadius: "12px",
                        px: 1.5,
                        py: 0.5,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {feature.highlight}
                    </Box>
                  )}

                  <Box
                    mb={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,117,74,0.1)",
                      transition: "all 0.3s ease",
                      marginBottom: "20px", // Consistent spacing
                      "&:hover": {
                        backgroundColor: "rgba(0,117,74,0.15)",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      position: "relative",
                      paddingBottom: "12px", // Consistent spacing
                      marginBottom: "16px", // Consistent spacing
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "30px",
                        height: "2px",
                        backgroundColor: "#00754a",
                      },
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      flex: 1, // This will push content to fill available space
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          
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
                      prirubber@email.com
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
                At HomiTask, we specialize in providing an intelligent and
                efficient home task management solution designed to streamline
                household organization.
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
