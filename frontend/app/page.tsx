'use client'

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { LibraryListTab } from './components/LibraryListTab'

export default function Home() {
  return (
      <Tabs>
        <TabList>
          <Tab>Library List</Tab>
          <Tab>Dashboard</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <LibraryListTab />
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
  )
}
