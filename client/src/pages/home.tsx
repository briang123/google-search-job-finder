import { motion } from "framer-motion";
import { Search, Rocket, Filter, ExternalLink } from "lucide-react";
import JobSearchForm from "@/components/JobSearchForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="bg-gradient-to-r from-primary to-purple-600 p-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="text-white text-xl" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold">JobSearch Pro</h1>
              <p className="text-sm text-muted-foreground">Advanced job board search</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Search Jobs Across 44+ Platforms
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Advanced Google search integration to find opportunities across all major job boards. 
            Save time with intelligent filtering and multi-site search capabilities.
          </p>
        </motion.section>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <JobSearchForm />
        </motion.div>

        {/* Features Section */}
        <motion.section 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className="text-center p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors duration-200"
            whileHover={{ y: -5 }}
          >
            <div className="bg-gradient-to-r from-primary to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="text-white" size={20} />
            </div>
            <h4 className="font-semibold mb-2">Fast & Efficient</h4>
            <p className="text-sm text-muted-foreground">Search multiple job boards simultaneously with advanced Google operators</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors duration-200"
            whileHover={{ y: -5 }}
          >
            <div className="bg-gradient-to-r from-primary to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="text-white" size={20} />
            </div>
            <h4 className="font-semibold mb-2">Smart Filtering</h4>
            <p className="text-sm text-muted-foreground">Precise location, timeline, and site-specific search parameters</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors duration-200"
            whileHover={{ y: -5 }}
          >
            <div className="bg-gradient-to-r from-primary to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="text-white" size={20} />
            </div>
            <h4 className="font-semibold mb-2">Direct Results</h4>
            <p className="text-sm text-muted-foreground">Opens Google search results in new tab for immediate access</p>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>This app was created by Brian Gaines to help others search and find jobs.</p>
          <p className="mt-2">
            Connect with me on {' '}
            <a 
              href="https://www.linkedin.com/in/briangaines/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors duration-200"
            >
              LinkedIn
            </a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
