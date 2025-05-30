import React from "react";
import { motion } from "framer-motion";
import { Users, Star, Award, Heart } from "lucide-react";
import Layout from "../components/layout/Layout";

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Alex has over 15 years of experience in workflow automation and software development.",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Sarah Chen",
      role: "Chief Product Officer",
      bio: "Sarah leads our product development team with her keen eye for UX design and functionality.",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Michael Roberts",
      role: "CTO",
      bio: "Michael oversees our technical architecture and ensures we stay at the cutting edge.",
      image:
        "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Jessica Kim",
      role: "Head of Customer Success",
      bio: "Jessica ensures our customers get the most value from our platform through training and support.",
      image:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Customer-Centric",
      description:
        "We put our customers at the heart of everything we do, constantly seeking feedback to improve.",
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Excellence",
      description:
        "We strive for excellence in our product, our processes, and our customer interactions.",
    },
    {
      icon: <Award className="h-8 w-8 text-purple-500" />,
      title: "Innovation",
      description:
        "We constantly push the boundaries of what's possible in workflow automation.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Integrity",
      description:
        "We operate with complete transparency and honesty in all our business dealings.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About TaskFlow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            We're on a mission to make workflow automation accessible to
            everyone, empowering teams to focus on what matters most.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <img
                src="https://images.pexels.com/photos/3182774/pexels-photo-3182774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Team collaboration"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2025, TaskFlow began with a simple observation:
                businesses were spending too much time managing processes
                instead of focusing on growth and innovation.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Our founding team had experienced this frustration firsthand
                across various industries, from finance to healthcare, and set
                out to build a solution that would make workflow automation
                intuitive, powerful, and accessible.
              </p>
              <p className="text-lg text-gray-700">
                Today, FlowMaster helps thousands of businesses streamline their
                operations, reduce errors, and reclaim valuable time through our
                visual workflow platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do, from product
              development to customer support and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate people behind FlowMaster who are dedicated to
              helping you optimize your workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
