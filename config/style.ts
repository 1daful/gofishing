import { HeaderStyle, HeroStyle } from "../src/utils/typeStyle";
import { ActionStyle } from "../src/utils/types";

export const actionStyle: ActionStyle = {
    type: 'push',
    shape: 'rounded',
    dense: true,
    //fab: 'fab',
    color: 'blue'
}

export const headerStyle: HeaderStyle = {
    class: { 'fixed-nav': true },
    style: { backgroundColor: "rgba(255, 0,255,0)" }
}

export const heroStyle: HeroStyle | undefined = {
    backgroundImage: "url(" + "./public/hero_blue.jpeg" + ")",
    position: "relative",
    height: "500px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(140, 23, 44, 0.7)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fixedNav: true,
    headerColor: "rgba(255, 0,255,1)",
  };