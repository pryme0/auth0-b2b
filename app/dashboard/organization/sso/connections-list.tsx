"use client"

import Link from "next/link"
import {
  DotsVerticalIcon,
  GearIcon,
  PersonIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { deleteConnection } from "./oidc/new/actions"

interface Props {
  connections: {
    id: string
    name: string
    strategy: string
    assignMembershipOnLogin: boolean
  }[]
}

export function ConnectionsList({ connections }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f8ff]">
      <div className="w-full max-w-[900px] rounded-lg bg-white p-6 shadow-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">
              Configured Connections
            </CardTitle>
            <CardDescription>
              The currently active SSO connections for your organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption className="text-gray-600">
                {connections.length} configured connections.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Strategy</TableHead>
                  <TableHead>Auto-Membership</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connections.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="w-[250px] font-medium text-gray-800">
                      {c.name}
                    </TableCell>
                    <TableCell className="text-gray-800">
                      {c.strategy}
                    </TableCell>
                    <TableCell>
                      {c.assignMembershipOnLogin ? (
                        <Badge className="bg-blue-100 text-blue-600">
                          Enabled
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Disabled</Badge>
                      )}
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline">
                              <DotsVerticalIcon className="size-4 text-gray-600" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-[160px]"
                          >
                            {c.strategy === "oidc" && (
                              <>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/organization/sso/oidc/edit/${c.id}/settings`}
                                  >
                                    <GearIcon className="mr-1 size-4" />
                                    Settings
                                  </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/organization/sso/oidc/edit/${c.id}/provisioning`}
                                  >
                                    <PersonIcon className="mr-1 size-4" />
                                    Provisioning
                                  </Link>
                                </DropdownMenuItem>
                              </>
                            )}

                            {c.strategy === "samlp" && (
                              <>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/organization/sso/saml/edit/${c.id}/settings`}
                                  >
                                    <GearIcon className="mr-1 size-4" />
                                    Settings
                                  </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/organization/sso/saml/edit/${c.id}/provisioning`}
                                  >
                                    <PersonIcon className="mr-1 size-4" />
                                    Provisioning
                                  </Link>
                                </DropdownMenuItem>
                              </>
                            )}
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-destructive">
                                <TrashIcon className="mr-1 size-4" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Connection {c.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the connection and
                              all users who have authenticated with it.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => {
                                const { error } = await deleteConnection(c.id)
                                if (error) {
                                  return toast.error(error)
                                }
                                toast.success(
                                  "The connection has been deleted."
                                )
                              }}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  <PlusIcon className="mr-1 size-4" />
                  Add Connection
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[160px]">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/organization/sso/oidc/new">OIDC</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/organization/sso/saml/new">SAML</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
