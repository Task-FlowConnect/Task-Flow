import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Workflow, Zap, Users, Layers } from 'lucide-react';
import Layout from '../components/layout/Layout';
import AnimatedText from '../components/home/AnimatedText';
import FeatureCard from '../components/home/FeatureCard';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-600 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <AnimatedText text="Build powerful workflows visually" />
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Create, visualize, and automate your business processes with our
                intuitive drag-and-drop workflow builder.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/workflow"
                  className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition duration-300 flex items-center justify-center"
                >
                  Start Building
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-lg shadow-xl overflow-hidden"
              >
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Workflow diagram"
                  className="w-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features at Your Fingertips
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our workflow builder combines simplicity with power to help you create
              effective business processes with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Workflow}
              title="Visual Workflow Builder"
              description="Create complex workflows visually using our intuitive drag-and-drop interface."
            />
            <FeatureCard
              icon={Zap}
              title="Instant Automation"
              description="Automate repetitive tasks and business processes with just a few clicks."
            />
            <FeatureCard
              icon={Users}
              title="Team Collaboration"
              description="Work together with your team to design and optimize workflows."
            />
            <FeatureCard
              icon={Layers}
              title="Flexible Integration"
              description="Connect with your favorite tools and services for seamless workflow integration."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Streamline Your Workflows?</h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that are increasing productivity and
            reducing errors with our workflow automation platform.
          </p>
          <Link
            to="/workflow"
            className="px-8 py-3 bg-white text-purple-700 font-medium rounded-lg hover:bg-purple-50 transition duration-300 inline-flex items-center"
          >
            Get Started Now
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;