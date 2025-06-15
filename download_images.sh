#!/bin/bash

# Create the portfolio images directory
mkdir -p assets/images/portfolio

# Download images from Unsplash (using specific images that match our projects)
# Mobile Apps
curl "https://images.unsplash.com/photo-1615461066841-6116e61058f4" -o assets/images/portfolio/blood-donation.jpg
curl "https://images.unsplash.com/photo-1556157382-97eda2d62296" -o assets/images/portfolio/lets-connect.jpg
curl "https://images.unsplash.com/photo-1553729459-efe14ef6055d" -o assets/images/portfolio/inventory-pro.jpg
curl "https://images.unsplash.com/photo-1546549032-9571cd6b27df" -o assets/images/portfolio/language-learning.jpg
curl "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40" -o assets/images/portfolio/field-force.jpg

# Business Solutions
curl "https://images.unsplash.com/photo-1497215728101-856f4ea42174" -o assets/images/portfolio/hr-management.jpg
curl "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" -o assets/images/portfolio/restaurant-pos.jpg
curl "https://images.unsplash.com/photo-1606836576983-8b458e75221d" -o assets/images/portfolio/school-management.jpg

# E-commerce
curl "https://images.unsplash.com/photo-1596040033229-a9821ebd058d" -o assets/images/portfolio/spices-hub.jpg
curl "https://images.unsplash.com/photo-1524758631624-e2822e304c36" -o assets/images/portfolio/furniture-store.jpg
curl "https://images.unsplash.com/photo-1561735445-df59ffba2bf4" -o assets/images/portfolio/art-gallery.jpg

# Real Estate
curl "https://images.unsplash.com/photo-1560518883-ce09059eeffa" -o assets/images/portfolio/real-estate-pro.jpg

# Make all images readable
chmod 644 assets/images/portfolio/* 