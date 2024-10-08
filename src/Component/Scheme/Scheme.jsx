import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import Footer from "../../Component/Footer/Footer";
import { db } from "../../config/firebase";
import { useUserAuth } from "../../context/UserAuthContext";
import Nav from "../nav/Nav";
import SchemeCard from "../SchemeCard/SchemeCard";
import "./Scheme.scss";
const Scheme = () => {
  const { user, getScheme } = useUserAuth();

  const [value, setValue] = useState("Central Government");
  const handleChange = (e) => setValue(e.target.value);
  const [schemeContent, setschemeContent] = useState([]);
  const ref = collection(db, "schemes");

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data = await getScheme();
    await setschemeContent(data);
    // const data = onSnapshot(ref, (doc) => {
    //   setschemeContent(doc.docs);
    // });
  };

  const menuItems = [...new Set(schemeContent.map((Val) => Val.type))];

  return (
    <div>
      <Nav />
      <div className="scheme-main">
        <div className="scheme-filter">
          <div className="scheme-filter-select">
            {/* <Select
              onChange={handleChange}
              className="scheme-select"
              defaultValue="central govt"
              sx={{ textTransform: "uppercase" }}
            >
              {menuItems.map((val) => (
                <MenuItem
                  value={val}
                  className="menuitem"
                  sx={{ textTransform: "uppercase" }}
                >
                  {val}
                </MenuItem>
              ))}
            </Select> */}
            <div
              className={
                value == "Central Government" ? "newsbtnactive" : "newsbtn"
              }
              onClick={() => setValue("Central Government")}
            >
              <h5>
                Central Government
                <hr />
              </h5>
            </div>
            <div
              className={
                value != "Central Government" ? "newsbtnactive" : "newsbtn"
              }
              onClick={() => setValue(`${user.location} Government`)}
            >
              <h5>
                {user.location} Government
                <hr />
              </h5>
            </div>
          </div>
        </div>
        {schemeContent &&
          schemeContent.map((datas) => {
            const c = datas;
            if (value === c.type)
              return (
                <SchemeCard
                  key={c.title}
                  title={c.title}
                  description={c.description}
                  image_url={c.image_url}
                  link={c.link}
                  content={c.content}
                />
              );
          })}
      </div>
      {/* <CustomPagination setPage={setPage}/> */}
      <Footer/>
    </div>
  );
};
export default Scheme;
