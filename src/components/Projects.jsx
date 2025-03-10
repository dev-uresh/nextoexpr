import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Container, Grid, Box, Button, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';


const Projects = () => {
  const [page, setPage] = React.useState(0);
  const cardsPerPage = 12;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Project 1",
      description: "Description of project 1. Add your project details here.",
      image: "https://cdn.pixabay.com/photo/2021/12/29/02/10/idea-6900632_640.png",
    },
    {
      title: "Project 2",
      description: "Description of project 2. Add your project details here.",
      image: "https://cdn.pixabay.com/photo/2021/12/29/02/10/idea-6900632_640.png",
    },
    {
      title: "Project 3",
      description: "Description of project 3. Add your project details here.",
      image: "https://cdn.pixabay.com/photo/2021/12/29/02/10/idea-6900632_640.png",
    },
    {
      title: "Project 4",
      description: "Description of project 4. Add your project details here.",
      image: "https://cdn.pixabay.com/photo/2021/12/29/02/10/idea-6900632_640.png",
    },
    {
        title: "Project 4",
        description: "Description of project 4. Add your project details here.",
        image: "https://cdn.pixabay.com/photo/2021/12/29/02/10/idea-6900632_640.png",
      },
      {
        title: "Project 4",
        description: "Description of project 4. Add your project details here.",
        image: "https://cdn.pixabay.com/photo/2021/12/29/02/10/idea-6900632_640.png",
      },
      {
        title: "Project 4",
        description: "Description of project 4. Add your project details here.",
        image: "https://cdn.pixabay.com/photo/2021/12/29/02/10/idea-6900632_640.png",
      },
      {
        title: "Project 4",
        description: "Description of project 4. Add your project details here.",
        image: "https://cdn.pixabay.com/photo/2021/12/29/02/10/idea-6900632_640.png",
      },
            
    
  ];

  const pageCount = Math.ceil(projects.length / cardsPerPage);
  const displayedProjects = projects.slice(
    page * cardsPerPage,
    (page + 1) * cardsPerPage
  );

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, pageCount - 1));
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    
    <section ref={ref}>
      <Box sx={{ py: 6, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
    
        <Container>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{ textAlign: 'center', mb: 2 }}
            >
              Our Projects
            </Typography>
            <Divider 
              sx={{ 
                mb: 4,
                mt: 2,
                borderColor: '#373690',
                borderWidth: 2,
                width: '80px',
                mx: 'auto'
              }} 
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Grid container spacing={3} justifyContent="center" >
              {displayedProjects.map((project, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={itemVariants}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.03)',
                          boxShadow: 3,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={project.image}
                        alt={project.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {project.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {project.description}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2 }}>
                        <Button 
                          variant="contained" 
                          fullWidth
                          sx={{ 
                            backgroundColor: '#373690',
                            '&:hover': {
                              backgroundColor: '#2d2b73'
                            }
                          }}
                        >
                          See More
                        </Button>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Pagination Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {projects.length > cardsPerPage && (
              <Stack 
                direction="row" 
                spacing={2} 
                justifyContent="center" 
                sx={{ mt: 4 }}
              >
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  onClick={handlePrevPage}
                  disabled={page === 0}
                >
                  Previous
                </Button>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    px: 2 
                  }}
                >
                  Page {page + 1} of {pageCount}
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleNextPage}
                  disabled={page === pageCount - 1}
                >
                  Next
                </Button>
              </Stack>
            )}
          </motion.div>
        </Container>
      </Box>
    </section>
  );
};

export default Projects;
