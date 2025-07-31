'use client';

import React, { useState } from 'react';
import { generateContent, generateContentVariations } from '@/lib/ai';
import { ImageSelector } from '@/components/ImageSelector';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Copy, RefreshCw, Calendar, Image as ImageIcon, Zap } from 'lucide-react';

interface ContentGenerationForm {
  topic: string;
  platform: 'instagram' | 'linkedin' | 'twitter' | 'facebook';
  tone: 'professional' | 'casual' | 'friendly' | 'engaging' | 'informative';
  includeHashtags: boolean;
  brandVoice: string;
}

interface ContentGeneratorProps {
  user?: any;
}

export const ContentGenerator: React.FC<ContentGeneratorProps> = ({ user }) => {
  const [form, setForm] = useState<ContentGenerationForm>({
    topic: '',
    platform: 'instagram',
    tone: 'engaging',
    includeHashtags: true,
    brandVoice: ''
  });
  
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageSelector, setShowImageSelector] = useState(false);

  const handleGenerate = async () => {
    if (!form.topic.trim()) return;
    
    setLoading(true);
    try {
      const content = await generateContent(form);
      setGeneratedContent(content);
      setVariations([]);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVariations = async () => {
    if (!generatedContent) return;
    
    setLoading(true);
    try {
      const newVariations = await generateContentVariations(form, 2);
      setVariations(newVariations);
    } catch (error) {
      console.error('Error generating variations:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              AI Content Generator
            </CardTitle>
            <p className="text-sm text-gray-600">Generate engaging posts with AI assistance</p>
          </div>
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
            <Zap className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div>
          <Label htmlFor="topic" className="text-sm font-medium text-gray-700">
            Topic or Theme
          </Label>
          <Input
            id="topic"
            placeholder="e.g., 'productivity tips for remote workers'"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="platform" className="text-sm font-medium text-gray-700">
            Platform
          </Label>
          <Select value={form.platform} onValueChange={(value) => setForm({ ...form, platform: value as any })}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="tone" className="text-sm font-medium text-gray-700">
            Brand Voice
          </Label>
          <Select value={form.tone} onValueChange={(value) => setForm({ ...form, tone: value as any })}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="engaging">Engaging</SelectItem>
              <SelectItem value="informative">Informative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="includeHashtags"
            checked={form.includeHashtags}
            onChange={(e) => setForm({ ...form, includeHashtags: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="includeHashtags" className="text-sm text-gray-700">
            Include relevant hashtags
          </label>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading || !form.topic.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>

        {/* Generated Content */}
        {generatedContent && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Content</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {form.platform} Post
                  </span>
                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generatedContent.caption)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <p className="text-gray-900 whitespace-pre-wrap mb-3">
                {generatedContent.caption}
              </p>
              
              {generatedContent.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {generatedContent.hashtags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Engagement Metrics Preview */}
              <div className="grid grid-cols-3 gap-4 p-3 bg-white rounded-lg mb-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">8.5K</p>
                  <p className="text-xs text-gray-500">Est. Reach</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">245</p>
                  <p className="text-xs text-gray-500">Est. Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">12</p>
                  <p className="text-xs text-gray-500">Est. Comments</p>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateVariations}
                  disabled={loading}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Generate Variations
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowImageSelector(!showImageSelector)}
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  {selectedImage ? 'Change Image' : 'Add Image'}
                </Button>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule Post
                </Button>
              </div>
            </div>

            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Image</h4>
                <div className="relative inline-block">
                  <img 
                    src={selectedImage} 
                    alt="Selected for post" 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Image Selector */}
            {showImageSelector && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Choose an Image</h4>
                <ImageSelector 
                  searchQuery={form.topic}
                  onImageSelect={(imageUrl) => {
                    setSelectedImage(imageUrl);
                    setShowImageSelector(false);
                  }}
                />
              </div>
            )}

            {/* AI Suggestions */}
            {generatedContent.suggestions.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">💡 AI Suggestions</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {generatedContent.suggestions.map((suggestion: string, index: number) => (
                    <li key={index}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Content Variations */}
        {variations.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alternative Variations</h3>
            <div className="grid gap-4">
              {variations.map((variation, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">
                        Variation {index + 1}
                      </span>
                      <Badge className="bg-purple-100 text-purple-700 text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        AI Generated
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(variation.caption)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-gray-900 whitespace-pre-wrap mb-3">
                    {variation.caption}
                  </p>
                  {variation.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {variation.hashtags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};