import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import Layout from '../components/Layout.jsx'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Projects from '../pages/Projects.jsx'
import Skills from '../pages/Skills.jsx'
import Experience from '../pages/Experience.jsx'
import Contact from '../pages/Contact.jsx'
import ReadMe from '../pages/ReadMe.jsx'

const rootRoute = createRootRoute({
  component: Layout,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: Projects,
})

const experienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/experience',
  component: Experience,
})

const skillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/skills',
  component: Skills,
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
})

const readmeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/readme',
  component: ReadMe,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  experienceRoute,
  projectsRoute,
  skillsRoute,
  contactRoute,
  readmeRoute,
])

export const router = createRouter({ routeTree })
