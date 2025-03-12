'use client';

import { useEditor } from '@/store/editor'

export function PropertyPanel() {
  const blocks = useEditor((state) => state.blocks)
  const selectedBlock = useEditor((state) => state.selectedBlock)
  const updateBlock = useEditor((state) => state.updateBlock)
  const removeBlock = useEditor((state) => state.removeBlock)

  if (!selectedBlock) {
    return null
  }

  const handleChange = (key: string, value: any) => {
    updateBlock(selectedBlock.id, { [key]: value })
  }

  return (
    <div className="p-4 border-l border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      <div className="space-y-4">
        {Object.entries(selectedBlock.props).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key}
            </label>
            <input
              type="text"
              value={value as string}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          onClick={() => removeBlock(selectedBlock.id)}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
        >
          Delete Block
        </button>
      </div>
    </div>
  )
} 