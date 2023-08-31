"use client";

import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useBoardStore } from '@/store/BoardStore';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

const types = [
  {
    id: 'pending',
    name: 'Pending',
    description: 'A new task to be completed',
    color: 'bg-red-500',
  },
  {
    id: 'ongoing',
    name: 'Ongoing',
    description: 'A task that is currently being worked out',
    color: 'bg-yellow-500',
  },
  {
    id: 'done',
    name: 'Done',
    description: 'A task that has been completed',
    color: 'bg-green-500',
  }
]

export default function TaskTypeRadioGroup() {
  const { newTaskType, setNewTaskType } = useBoardStore()

  return (
    <div className="w-full px-4 py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.id}
                value={type.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-500'
                      : ''
                  }
                  ${
                    checked ? `${type.color} bg-opacity-75 text-white` : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {type.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {type.description}
                            </span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckCircleIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
