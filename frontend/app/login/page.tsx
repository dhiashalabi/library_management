'use client'

import { useFrappeAuth } from 'frappe-react-sdk'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Login = () => {
  const { currentUser, login, logout } = useFrappeAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [currentUser, router])

  const handleSubmit = () => {
    login({
      username: email,
      password: password,
    })
  }

  const handleGoToHome = () => {
    router.replace('/')
  }

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!loading && currentUser) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div>
          <p>Logged in as {currentUser}</p>
          <Button onClick={handleGoToHome}>Go to Home</Button>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Hello</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane.doe@example.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
