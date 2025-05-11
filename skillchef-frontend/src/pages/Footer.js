import React from "react";
import {
  Typography,
  Box,
  Grid,
  Link,
  Container,
  IconButton,
} from "@mui/material";
import Facebook from "@mui/icons-material/Facebook";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import Pinterest from "@mui/icons-material/Pinterest";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f9f9f9",
        borderTop: "1px solid #e0e0e0",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Useful Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              USEFUL LINKS
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Categories
              </Link>
              <Link href="#" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Videos
              </Link>
              <Link href="#" color="inherit" underline="hover">
                More
              </Link>
            </Box>
          </Grid>

          {/* Navigation */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              NAVIGATION
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Products
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Gallery
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Testimonials
              </Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              CONTACT
            </Typography>
            <Typography variant="body2" color="text.secondary">
              PRI (Pvt) Ltd. 123, Industrial Zone,
              <br />
              Colombo 05, Colombo, 00500, Sri Lanka
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              +94-78 111 1111
            </Typography>
            <Typography variant="body2" color="text.secondary">
              websupport@justdial.com
            </Typography>
          </Grid>
        </Grid>

        {/* Social Media */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            CONNECT
          </Typography>
          <Box>
            <IconButton href="#" sx={{ color: "#34a853" }}>
              <Facebook />
            </IconButton>
            <IconButton href="#" sx={{ color: "#34a853" }}>
              <LinkedIn />
            </IconButton>
            <IconButton href="#" sx={{ color: "#34a853" }}>
              <Instagram />
            </IconButton>
            <IconButton href="#" sx={{ color: "#34a853" }}>
              <Twitter />
            </IconButton>
            <IconButton href="#" sx={{ color: "#34a853" }}>
              <Pinterest />
            </IconButton>
          </Box>
        </Box>

        {/* Copyright */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © Copyrights 2023 - 2024 Prism Home Decor. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
