namespace BaseSPA.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class provesulledate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Blog", "Created", c => c.DateTime(nullable: false));
            AddColumn("dbo.Blog", "Date", c => c.DateTime(nullable: false, storeType: "date"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Blog", "Date");
            DropColumn("dbo.Blog", "Created");
        }
    }
}
