import { useEffect, useState } from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth, fs } = usePuterStore();
  const [files, setFiles] = useState<FSItem[]>();

  useEffect(() => {
    const loadFiles = async () => {
      const files = (await fs.readDir("./")) as FSItem[];
      setFiles(files);
    };
    loadFiles();
  }, [files]);

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">San's Resume</p>
      </Link>

      <Link to="/upload" className="primary-button w-fit">
        Upload Resume
      </Link>

      {auth.isAuthenticated && (
        <button className="primary-button w-fit" onClick={auth.signOut}>
          Sign Out
        </button>
      )}

      {files && (
        <Link to="/wipe" className="primary-button w-fit">
          Delete Resumes
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
