import { Button, Progress } from "antd";
import images from "constants/images";
import Layout from "layouts/Layout";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./index.css";

const slideImages = [images.BANNER1, images.BANNER2];

const properties = {
  duration: 5000,
  autoplay: true,
  transitionDuration: 500,
  arrows: false,
  infinite: true,
  easing: "ease",
};

function Home() {
  return (
    <Layout>
      <main style={{ marginTop: 60 }}>
        <section className="hero">
          <Slide className="hero-image" {...properties}>
            {slideImages.map((each, index) => (
              <div key={index} className="each-slide">
                <img
                  className="lazy"
                  src={each}
                  alt="sample"
                  style={{ maxWidth: 680, maxHeight: 500 }}
                />
                <Progress
                  showInfo={false}
                  percent={(index === 0 && 50) || (index === 1 && 100)}
                />
              </div>
            ))}
          </Slide>
          <div className="hero-content">
            <h2 className="hero-caption second-font">create & learn</h2>
            <h1 className="hero-heading second-font">Flashcard</h1>
            <Link to="/register">
              <Button size="large" className="btn btn--primary">
                GET STARTED
              </Button>
            </Link>
          </div>
        </section>
        <section className="partner">
          <div className="container">
            <blockquote>
              Flashcard has helped me to understand just how fun and important
              and fun studying can be! This school year, in chemistry class I
              put my terms on Flashcard and I already feel better about my
              upcoming test.
            </blockquote>
            <cite>Tien Dat</cite>
          </div>
        </section>
        <section className="partner" id="partners">
          <div className="container">
            <div className="partner-main">
              <Link to="/" className="partner-item">
                <img src={images.LOGO1} alt="" />
              </Link>
              <Link to="/" className="partner-item">
                <img src={images.LOGO2} alt="" />
              </Link>
              <Link to="/" className="partner-item">
                <img src={images.LOGO3} alt="" />
              </Link>
              <Link to="/" className="partner-item">
                <img src={images.LOGO4} alt="" />
              </Link>
              <Link to="/" className="partner-item">
                <img src={images.LOGO5} alt="" />
              </Link>
              <Link to="/" className="partner-item">
                <img src={images.LOGO6} alt="" />
              </Link>
              <Link to="/" className="partner-item">
                <img src={images.LOGO7} alt="" />
              </Link>
              <Link to="/" className="partner-item">
                <img src={images.LOGO8} alt="" />
              </Link>
            </div>
          </div>
        </section>
        <section className="team" id="team">
          <div className="container">
            <div className="team-main">
              <div className="team-content">
                <h2 className="team-heading heading second-font">
                  Flashcard improve higher grades.
                </h2>
                <p className="team-desc">
                  You bring the brains, we’ll bring everything else. From
                  flashcards to help you learn francais, to games that make it
                  easy to get a handle on history, use a variety of tools to
                  conquer any challenge.
                </p>
                <Link to="/register">
                  <Button size="large" className="btn btn--primary">
                    GET STARTED
                  </Button>
                </Link>
              </div>
              <div className="team-images">
                <div className="team-column">
                  <Link to="/" className="team-image">
                    <img src={images.TEAM1} alt="" />
                  </Link>
                  <Link to="/" className="team-image">
                    <img src={images.TEAM2} className="team-img2" alt="" />
                  </Link>
                </div>
                <div className="team-column">
                  <Link to="/" className="team-image">
                    <img src={images.TEAM3} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="blog" id="blog">
          <div className="container">
            <div className="blog-header">
              <h2 className="blog-heading heading">FLASHCARD IS FOR</h2>
              <p className="blog-desc text">
                “Get through exams to get to vacation” members.
              </p>
            </div>
            <div className="blog-list">
              <div className="blog-item">
                <Link to="/" className="blog-image">
                  <img src={images.BLOG1} alt="" />
                </Link>
                <h3>
                  <Link className="blog-title title" to="/">
                    Illustration development basics for beginners
                  </Link>
                </h3>
              </div>
              <div className="blog-item">
                <Link to="/" className="blog-image">
                  <img src={images.BLOG2} alt="" />
                </Link>
                <h3>
                  <Link className="blog-title title" to="/">
                    Illustration development basics for intermediate
                  </Link>
                </h3>
              </div>
              <div className="blog-item">
                <Link to="/" className="blog-image">
                  <img src={images.BLOG3} alt="" />
                </Link>
                <h3>
                  <Link className="blog-title title" to="/">
                    Illustration development basics for advanced
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
export default Home;
