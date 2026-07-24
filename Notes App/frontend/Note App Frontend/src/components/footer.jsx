const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gray-100 border-t border-gray-200 mt-auto h-[10vh]">
      <div className="text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Your App Name. All rights reserved.</p>
        <p className="mt-1">Built with React & Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;