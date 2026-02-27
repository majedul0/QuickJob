import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src="/logo.png" alt="QuickHire" className="footer__logo-img" />
          </Link>
          <p className="footer__tagline">
            Great platform for job seekers searching for new career opportunities
            and employers looking for top talent.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__col-title">About</h4>
            <ul>
              <li><Link to="/">Companies</Link></li>
              <li><Link to="/">Pricing</Link></li>
              <li><Link to="/">Terms</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Resources</h4>
            <ul>
              <li><Link to="/">Help Docs</Link></li>
              <li><Link to="/">Guide</Link></li>
              <li><Link to="/">Updates</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© 2026 QuickHire. All rights reserved.</p>
      </div>
    </footer>
  );
}
