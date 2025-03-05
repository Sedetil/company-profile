"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getMessages, markMessageAsRead } from "@/lib/api"
import { formatDistanceToNow } from "date-fns"

export default function MessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchMessages()
  }, []) // Removed activeTab from dependencies

  const fetchMessages = async () => {
    setLoading(true)
    try {
      let isRead
      if (activeTab === "unread") isRead = false
      if (activeTab === "read") isRead = true

      const data = await getMessages(isRead)
      setMessages(data)
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id, currentStatus) => {
    try {
      await markMessageAsRead(id, !currentStatus)
      // Refresh the messages list
      fetchMessages()
    } catch (error) {
      console.error("Error updating message:", error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Messages</h1>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Messages</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <MessagesList messages={messages} loading={loading} onMarkAsRead={handleMarkAsRead} />
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          <MessagesList messages={messages} loading={loading} onMarkAsRead={handleMarkAsRead} />
        </TabsContent>

        <TabsContent value="read" className="mt-6">
          <MessagesList messages={messages} loading={loading} onMarkAsRead={handleMarkAsRead} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MessagesList({ messages, loading, onMarkAsRead }) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500">No messages found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card key={message.id} className={message.is_read ? "" : "border-l-4 border-l-yellow-500"}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{message.subject}</CardTitle>
                <CardDescription>
                  From: {message.name} ({message.email}){message.phone && ` • ${message.phone}`}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={message.is_read ? "outline" : "default"}>{message.is_read ? "Read" : "Unread"}</Badge>
                <Button variant="ghost" size="sm" onClick={() => onMarkAsRead(message.id, message.is_read)}>
                  Mark as {message.is_read ? "unread" : "read"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="whitespace-pre-wrap">{message.message}</p>
              <p className="text-sm text-gray-500">
                Received {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

