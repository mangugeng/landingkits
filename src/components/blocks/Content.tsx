'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ContentProps {
  title?: string;
  content?: string;
}

const defaultContent = `
# Welcome to Our Platform

We're excited to have you here! Our platform offers a comprehensive solution for all your needs.

## Key Features

- **Easy to Use**: Intuitive interface that anyone can master
- **Powerful Tools**: Advanced features for professional users
- **Flexible Options**: Customize everything to match your needs
- **Great Support**: Our team is here to help you succeed

## Getting Started

1. Create your account
2. Set up your profile
3. Explore our features
4. Start building amazing things

## Why Choose Us?

> "The best way to predict the future is to create it." - Peter Drucker

We believe in empowering our users with the tools they need to succeed. Our platform combines ease of use with powerful features to help you achieve your goals.

### Security First

We take security seriously. Your data is protected with:

- End-to-end encryption
- Regular security audits
- Compliance with industry standards
- Secure data centers

### Continuous Innovation

We're constantly improving our platform with:

- Regular updates
- New features
- Performance improvements
- User-requested enhancements

## Ready to Start?

Contact our team today to learn more about how we can help you succeed.
`;

const Content = ({
  title = 'About Our Platform',
  content = defaultContent,
}: ContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(content);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <div className="mt-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {isEditing ? 'Preview' : 'Edit'}
              </button>
            </div>
            {isEditing ? (
              <textarea
                value={editableContent}
                onChange={handleContentChange}
                className="w-full min-h-[500px] p-4 border rounded-md font-mono text-sm"
                placeholder="Enter your content in Markdown format..."
              />
            ) : (
              <div className="prose prose-lg prose-blue max-w-none">
                <ReactMarkdown>{editableContent}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content; 