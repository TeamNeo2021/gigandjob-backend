export interface Publisher {
    publish(evts: any[]): Promise<void>
}
