import { sessionService } from 'redux-react-session';

export async function getTokenFromSession() {
  try {
    return await sessionService.loadSession();
  } catch (error) {
    return {};
  }
}

export async function getUserFromSession() {
  try {
    return await sessionService.loadUser();
  } catch (error) {
    return {};
  }
}
