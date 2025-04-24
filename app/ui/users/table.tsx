import { UpdateUser, DeleteUser } from '@/app/ui/users/buttons';
import { fetchFilteredUsers } from '@/app/lib/data';
import { auth } from '@/auth';

export default async function UsersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const session = await auth();  
  const currentUserEmail = session?.user?.email ?? null;

  const users = await fetchFilteredUsers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* モバイル表示 */}
          <div className="md:hidden">
            {users?.map((user) => {
              const isCurrentUser = user.email === currentUserEmail;
              const isUserRole = user.role === 'user';
              const showActions = isCurrentUser || isUserRole;

              return (
                <div
                  key={user.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{user.name}</p>
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p>{user.role}</p>
                    </div>
                    {showActions && (
                      <div className="flex justify-end gap-2">
                        <UpdateUser id={user.id} />
                        <DeleteUser id={user.id} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* デスクトップ表示 */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Role
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users?.map((user) => {
                const isCurrentUser = user.email === currentUserEmail;
                const isUserRole = user.role === 'user';
                const showActions = isCurrentUser || isUserRole;

                return (
                  <tr
                    key={user.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{user.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {user.role}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {showActions && (
                        <div className="flex justify-end gap-3">
                          <UpdateUser id={user.id} />
                          <DeleteUser id={user.id} />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
