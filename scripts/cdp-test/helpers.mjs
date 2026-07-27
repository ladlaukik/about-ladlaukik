import WebSocket from 'ws';
import fs from 'fs';

export async function connect(port = 9222) {
  const target = JSON.parse(await (await fetch(`http://localhost:${port}/json`)).text())[0];
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.on('open', resolve));
  let id = 0;
  function send(method, params = {}) {
    id += 1;
    const thisId = id;
    return new Promise((resolve) => {
      const handler = (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.id === thisId) {
          ws.off('message', handler);
          resolve(msg.result);
        }
      };
      ws.on('message', handler);
      ws.send(JSON.stringify({ id: thisId, method, params }));
    });
  }
  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');
  return { ws, send };
}

export async function evalJs(send, expression, awaitPromise = false) {
  const result = await send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
  return result.result.value;
}

export async function screenshot(send, path) {
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path, Buffer.from(shot.data, 'base64'));
}

export async function mouseMove(send, x, y) {
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
}

export async function click(send, x, y) {
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
}

export async function rightClick(send, x, y) {
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'right', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'right', clickCount: 1 });
}

export async function keyPress(send, key, code, windowsVirtualKeyCode) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode });
}

export function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
