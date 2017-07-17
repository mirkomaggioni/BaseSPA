namespace BaseSPA.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class aggiuntoproprietànomeablog : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Blog", "Name", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Blog", "Name");
        }
    }
}
