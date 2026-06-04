import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { Session } from 'next-auth';
type SessionUser = {
  user: Session['user'];
  userId: string;
};
export const getSessionUser = async (): Promise<SessionUser | null> => {
  try {
    const session = await getServerSession(authOptions);
    console.log('Fetched session:', session);
    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.log('Error fetching session user:', error);
    return null
  }

};
