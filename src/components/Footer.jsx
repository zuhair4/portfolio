import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a href="https://github.com/zuhair4" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/zuhair-abbas07/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="https://leetcode.com/u/zuhair4/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
            <SiLeetcode />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Zuhair Abbas. All rights reserved.</p>
        <p className="footer-signature">
          Built with <span>React</span> ⚡
        </p>
      </div>
    </footer>
  )
}
