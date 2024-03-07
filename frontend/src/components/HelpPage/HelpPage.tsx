import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation";

export default function helpPage() {
  return (
    <motion.div
      className="p-8 bg-blue-100 bg-opacity-50 h-full overflow-auto"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >
      <h1 className="flex items-center justify-center pt-16 text-cyan-800 font-bold break-all">
        WELCOME TO HELP PAGE
      </h1>
      <p className=" break-all flex items-center justify-center px-32 pt-16 pb-16 text-cyan-800 font-bold text-center">
        Welcome to our decentralized platform! Whether you're a seasoned user or
        just getting started, navigating our website is a breeze. Our platform
        empowers you to seamlessly interact with peers, access a wide array of
        files through our features, and explore the market for resources you
        need. Here's a quick guide to help you make the most of your experience:
      </p>
      <h3 className="pl-8 pt-8 text-cyan-800 font-bold break-all flex items-center justify-center">
        File Upload
      </h3>
      <p className=" break-all flex items-center justify-center px-32 pt-8 text-cyan-800 font-bold text-center">
        Looking to share your files with the community or access resources
        uploaded by others? Our FileUpload feature allows you to easily upload,
        manage, and share files with peers across the network. Whether it's
        documents, images, videos, or more, sharing has never been simpler.
      </p>
      <h3 className="pl-8 pt-8 text-cyan-800 font-bold break-all flex items-center justify-center">
        Marketplace
      </h3>
      <p className=" break-all flex items-center justify-center px-32 pt-8 text-cyan-800 font-bold text-center">
        Explore our decentralized marketplace to discover a diverse range of
        files shared by fellow users. Our intuitive search functionality enables
        you to find specific files or browse through categories of interest.
        From educational materials to multimedia content, the possibilities are
        endless.
      </p>

      <h3 className="pl-8 pt-16 text-cyan-800 font-bold break-all flex items-center justify-center">
        Security and Privacy
      </h3>
      <p className=" break-all flex items-center justify-center px-32 pt-8 text-cyan-800 font-bold text-center">
        Rest assured, our platform prioritizes your security and privacy. With
        decentralized architecture, your data remains secure and accessible only
        to you and your chosen peers. We employ robust encryption techniques to
        safeguard your information at all times.
      </p>
    </motion.div>
  );
}
