import { render } from "ink";

import WindowHandler from "./WindowHandler";
import ListenerProvider from "./ListenerProvider";
import Container from "./Container";
import fsInputHandler from "./fsHandler";

function Main({ input }: { input: string; location: string }) {
  return (
    <WindowHandler input={input} location={location}>
      <ListenerProvider>
        <Container />
      </ListenerProvider>
    </WindowHandler>
  );
}

const [input, location] = fsInputHandler();
render(<Main input={input} location={location} />, { exitOnCtrlC: false });
