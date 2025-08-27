"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Camera, Save, ArrowLeft, Mail, Phone } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  department: string
  position: string
  bio: string
  language: string
  timezone: string
  dateJoined: string
  lastLogin: string
}

const initialProfile: UserProfile = {
  id: "user-001",
  name: "管理者 太郎",
  email: "admin@example.com",
  phone: "090-1234-5678",
  avatar: "/placeholder-user.jpg",
  department: "営業部",
  position: "部長",
  bio: "売上管理システムの管理者として、チーム全体のパフォーマンス向上に取り組んでいます。",
  language: "ja",
  timezone: "Asia/Tokyo",
  dateJoined: "2023-01-15",
  lastLogin: "2024-01-20T10:30:00Z"
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [isLoading, setIsLoading] = useState(false)

  // Static Export版：ローカルストレージからプロファイルを読み込み
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Static Export版：ローカルストレージにプロファイルを保存
      localStorage.setItem('userProfile', JSON.stringify(profile))
      console.log("プロファイルを保存:", profile)
    } catch (error) {
      console.error("プロファイル保存エラー:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // ここで実際のファイルアップロード処理を行う
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfile(prev => ({ ...prev, avatar: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/settings">
              <ArrowLeft className="mr-2 h-4 w-4" />
              設定に戻る
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <User className="h-8 w-8" />
            <h2 className="text-3xl font-bold tracking-tight">プロファイル設定</h2>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "保存中..." : "変更を保存"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>プロファイル画像</CardTitle>
            <CardDescription>
              アカウントの画像を設定できます
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-2xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="flex items-center space-x-2 bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-md">
                    <Camera className="h-4 w-4" />
                    <span>画像を変更</span>
                  </div>
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">アカウント情報</p>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  ユーザーID: {profile.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  登録日: {new Date(profile.dateJoined).toLocaleDateString('ja-JP')}
                </p>
                <p className="text-sm text-muted-foreground">
                  最終ログイン: {new Date(profile.lastLogin).toLocaleString('ja-JP')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
            <CardDescription>
              あなたの基本的な情報を管理できます
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">氏名 *</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">部署</Label>
                <Input
                  id="department"
                  value={profile.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">役職</Label>
                <Input
                  id="position"
                  value={profile.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">言語設定</Label>
                <Select value={profile.language} onValueChange={(value) => handleInputChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">タイムゾーン</Label>
                <Select value={profile.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                    <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                    <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">自己紹介</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
                placeholder="自己紹介や担当業務について記入してください..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>パスワード変更</CardTitle>
          <CardDescription>
            セキュリティのため定期的にパスワードを変更することをお勧めします
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">現在のパスワード</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="現在のパスワードを入力"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">新しいパスワード</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="新しいパスワードを入力"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">パスワード確認</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="新しいパスワードを再入力"
              />
            </div>
          </div>
          <Button variant="outline">
            パスワードを変更
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
