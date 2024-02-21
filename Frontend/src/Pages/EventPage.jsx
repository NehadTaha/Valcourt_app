import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/EventBody.css";

function EventPage() {
  return (
    <>
      <Navbar props={{
        isLoggedIn:false
      }}/>
      <section class="content-container">
        <div class="content-tag">
          <div class="tags">
            <div>
              <label for="">Cooking</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Sports</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Tech</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Art</label>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <label for="">Work</label>
              <input type="checkbox" name="" id="" />
            </div>

            <button>save</button>
          </div>
        </div>

        <div class="content-card">
          <Card
            prop={{
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
              title: "This is Some Title",
              date: "16/02/2024",
            }}
          />
          <Card
            prop={{
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
              title: "This is Some Title",
              date: "31/10/2024",
            }}
          />
        </div>

        <div class="content-fbtn">
          <button class="floating-button">
            <i class="fa fa-caret-square-o-up"></i>
            <p>Go to top</p>
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default EventPage;
