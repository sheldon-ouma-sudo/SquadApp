//
//  SquadApp.swift
//  Shared
//
//  Created by Sheldon Otieno on 7/24/22.
//

import SwiftUI

@main
struct SquadApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
