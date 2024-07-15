import type { BoardMemberType, BoardType } from '#entities/boards';
import { boardsApi } from '#entities/boards';
import { useUserStore } from '#entities/user';

export type BoardWithMembersType = BoardType & {
  members: BoardMemberType[];
};

const fetchMembers = async (boardId: number): Promise<BoardMemberType[]> => {
  const { data, error } = await boardsApi.getAllMembers(boardId);

  if (!error.value && data.value) {
    return data.value.payload;
  }

  return [];
};

export const useBoardsStore = () => {
  const boards = useState<BoardWithMembersType[]>('storedBoards', () => []);

  const nuxtApp = useNuxtApp();

  const fetchBoards = async () => {
    const { data, error } = await boardsApi.getAll();

    if (!error.value && data.value) {
      boards.value = await Promise.all(
        data.value.payload.map(async (board): Promise<BoardWithMembersType> => {
          return {
            ...board,
            members: await nuxtApp.runWithContext(() => fetchMembers(board.id)),
          };
        })
      );
    }
  };

  return {
    boards,
    fetchBoards,
  };
};
