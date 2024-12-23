import { Label } from "@radix-ui/react-label"

import { appClient, managementClient } from "@/lib/auth0"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"

import { DisplayNameForm } from "./organization/general/display-name-form"

export default async function DashboardHome() {
  const session = await appClient.getSession()

  const { data: org } = await managementClient.organizations.get({
    id: session!.user.org_id,
  })

  console.log({ session })

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f8ff]">
      {/* Main container with flex for centering */}
      <div className="flex w-full max-w-[500px] flex-col items-center gap-6 p-6">
        {/* Card container with centered content */}
        <Card className="w-full border-none bg-[#e0f7fa] shadow-none">
          <CardHeader>
            <CardTitle className="text-blue-600">
              Organization Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid w-full max-w-sm items-start gap-2">
              <Label className="text-blue-600">Display Name</Label>
              <p className="text-lg font-semibold text-gray-800">
                {org.display_name || "N/A"}
              </p>
            </div>

            <div className="grid w-full max-w-sm items-start gap-2">
              <Label className="text-blue-600">Organization Name</Label>
              <p className="text-lg font-semibold text-gray-800">
                {org.name || "N/A"}
              </p>
            </div>

            <div className="grid w-full max-w-sm items-start gap-2">
              <Label className="text-blue-600">User name</Label>
              <p className="text-lg font-semibold text-gray-800">
                {session?.user.name || "N/A"}
              </p>
            </div>

            <div className="grid w-full max-w-sm items-start gap-2">
              <Label className="text-blue-600"> Email</Label>
              <p className="text-lg font-semibold text-gray-800">
                {session?.user.email || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
